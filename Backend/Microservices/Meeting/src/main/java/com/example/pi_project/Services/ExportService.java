package com.example.pi_project.Services;

import com.example.pi_project.Entities.*;
import com.example.pi_project.Repositories.MeetingRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ExportService {

    @Autowired
    private MeetingRepository meetingRepository;

    // Export to Excel
    public ByteArrayOutputStream exportMeetingsToExcel() throws IOException {
        List<Meeting> meetings = meetingRepository.findAll();
        if (meetings.isEmpty()) {
            throw new IllegalStateException("No meetings available for export.");
        }

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Meetings");

        // Create header row with all relevant fields
        Row headerRow = sheet.createRow(0);
        String[] headers = {
                "Title", "Date", "Duration (min)", "Location",
                "Street", "City", "Country", "Postal Code",
                "Frequency", "Type", "Description"
        };

        for (int i = 0; i < headers.length; i++) {
            headerRow.createCell(i).setCellValue(headers[i]);
        }

        // Fill data rows
        int rowNum = 1;
        for (Meeting meeting : meetings) {
            Row row = sheet.createRow(rowNum++);

            // Basic meeting info
            row.createCell(0).setCellValue(meeting.getTitle());
            row.createCell(1).setCellValue(meeting.getDate().toString());
            row.createCell(2).setCellValue(meeting.getDuration());
            row.createCell(3).setCellValue(meeting.getLocation());

            // Address info
            Meeting.Address address = meeting.getAddress();
            row.createCell(4).setCellValue(address != null ? address.getStreet() : "");
            row.createCell(5).setCellValue(address != null ? address.getCity() : "");
            row.createCell(6).setCellValue(address != null ? address.getCountry() : "");
            row.createCell(7).setCellValue(address != null ? address.getPostalCode() : "");

            // Meeting details
            row.createCell(8).setCellValue(meeting.getFrequency() != null ? meeting.getFrequency().getDisplayName() : "");
            row.createCell(9).setCellValue(meeting.getType() != null ? meeting.getType().getDisplayName() : "");
            row.createCell(10).setCellValue(meeting.getDescription() != null ? meeting.getDescription() : "");
        }

        // Auto-size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;
    }


    public ByteArrayOutputStream exportMeetingsToPdf() throws DocumentException, IOException {
        List<Meeting> meetings = meetingRepository.findAll();
        if (meetings.isEmpty()) {
            throw new IllegalStateException("No meetings available for export.");
        }

        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Font definitions
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
        Font normalFont = new Font(Font.FontFamily.HELVETICA, 10);
        BaseColor headerBgColor = new BaseColor(66, 139, 202);

        try {
            PdfWriter.getInstance(document, outputStream);

            document.addTitle("Meetings Export");
            document.addCreator("Your Application Name");
            document.open();

            // Title
            Paragraph title = new Paragraph("Meetings Export Report", new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD));
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20f);
            document.add(title);

            // Generation date
            Paragraph generatedOn = new Paragraph("Generated on: " + new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()), normalFont);
            generatedOn.setAlignment(Element.ALIGN_RIGHT);
            generatedOn.setSpacingAfter(15f);
            document.add(generatedOn);

            // Table
            PdfPTable table = new PdfPTable(11);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);
            table.setWidths(new float[]{2f, 2f, 1f, 2f, 2f, 1.5f, 1.5f, 1.5f, 1.5f, 1.5f, 3f});

            // Header row
            String[] headers = {
                    "Title", "Date", "Duration", "Location", "Street",
                    "City", "Country", "Postal Code", "Frequency", "Type", "Description"
            };
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
                cell.setBackgroundColor(headerBgColor);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(5f);
                table.addCell(cell);
            }

            // Data rows
            for (Meeting meeting : meetings) {
                table.addCell(createCell(meeting.getTitle(), normalFont));

                // ✅ Corrected date handling
                Object dateObj = meeting.getDate();
                String formattedDate = "";
                if (dateObj instanceof Date) {
                    formattedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm").format((Date) dateObj);
                } else if (dateObj instanceof java.time.LocalDateTime) {
                    formattedDate = ((java.time.LocalDateTime) dateObj)
                            .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
                } else if (dateObj instanceof java.time.LocalDate) {
                    formattedDate = ((java.time.LocalDate) dateObj)
                            .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                }
                table.addCell(createCell(formattedDate, normalFont));

                table.addCell(createCell(
                        meeting.getDuration() != null ? String.valueOf(meeting.getDuration()) : "", normalFont));
                table.addCell(createCell(meeting.getLocation(), normalFont));

                Meeting.Address address = meeting.getAddress();
                table.addCell(createCell(address != null ? address.getStreet() : "", normalFont));
                table.addCell(createCell(address != null ? address.getCity() : "", normalFont));
                table.addCell(createCell(address != null ? address.getCountry() : "", normalFont));
                table.addCell(createCell(address != null ? address.getPostalCode() : "", normalFont));

                table.addCell(createCell(
                        meeting.getFrequency() != null ? meeting.getFrequency().getDisplayName() : "", normalFont));
                table.addCell(createCell(
                        meeting.getType() != null ? meeting.getType().getDisplayName() : "", normalFont));
                table.addCell(createCell(meeting.getDescription(), normalFont));
            }

            document.add(table);

            // Footer
            Paragraph footer = new Paragraph("Total meetings: " + meetings.size(), normalFont);
            footer.setAlignment(Element.ALIGN_RIGHT);
            footer.setSpacingBefore(15f);
            document.add(footer);

        } finally {
            if (document != null && document.isOpen()) {
                document.close();
            }
        }

        return outputStream;
    }

    private PdfPCell createCell(String content, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(safeString(content), font));
        cell.setPadding(4f);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        return cell;
    }

    private String safeString(String input) {
        return input != null ? input : "";
    }
}