package tn.esprit.userdomain.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;

import org.thymeleaf.context.Context;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(String to,
                          String subject,
                          String username,
                          String activationCode,
                          String confirmationUrl) throws MessagingException {
        // Prepare the Thymeleaf context
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("ActivationCode", activationCode);
        context.setVariable("confirmationUrl", confirmationUrl);

        // Process the template with the context
        String emailContent = templateEngine.process("activate_account", context);

        // Create the MimeMessage
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        // Set email details

        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(emailContent, true); // true indicates HTML content
        System.out.println("Generated Confirmation URL: " + confirmationUrl);

        // Send the email
        mailSender.send(message);

    }


    @Async
    public void sendResetPasswordEmail(String to, String username, String resetLink) throws MessagingException {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("resetLink", resetLink);

        String emailContent = templateEngine.process("reset_password", context);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        messageHelper.setTo(to);
        messageHelper.setSubject("Réinitialisation de votre mot de passe");
        messageHelper.setText(emailContent, true);

        mailSender.send(message);
    }

}
