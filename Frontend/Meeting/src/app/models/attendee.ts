export type Title =
  | 'PROJECT_MANAGER'
  | 'SITE_MANAGER'
  | 'ARCHITECT'
  | 'CIVIL_ENGINEER'
  | 'ELECTRICAL_ENGINEER'
  | 'MECHANICAL_ENGINEER'
  | 'SAFETY_OFFICER'
  | 'QUANTITY_SURVEYOR'
  | 'CONTRACTOR'
  | 'SUBCONTRACTOR'
  | 'CLIENT_REPRESENTATIVE'
  | 'SUPPLIER'
  | 'TECHNICIAN'
  | 'LABORER'
  | 'OTHER';

export type AttendanceType =
  | 'IN_PERSON'
  | 'REMOTE'
  | 'HYBRID';

export type AttendanceStatus =
  | 'REGISTERED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'ATTENDED'
  | 'NO_SHOW';

export interface Attendee {
  id?: number;
  name?: string;
  title?: Title;
  email?: string;
  attendanceType?: AttendanceType;
  attendanceStatus?: AttendanceStatus;
  safetyBriefingCompleted?: boolean;
  meetingId?: number; // Optional reference to meeting, just ID here for simplicity
}

export enum Titles {
  PROJECT_MANAGER = "Chef de projet",
  SITE_MANAGER = "Chef de chantier",
  ARCHITECT = "Architecte",
  CIVIL_ENGINEER = "Ingénieur civil",
  ELECTRICAL_ENGINEER = "Ingénieur électricien",
  MECHANICAL_ENGINEER = "Ingénieur mécanicien",
  SAFETY_OFFICER = "Responsable sécurité",
  QUANTITY_SURVEYOR = "Métreur",
  CONTRACTOR = "Entrepreneur",
  SUBCONTRACTOR = "Sous-traitant",
  CLIENT_REPRESENTATIVE = "Représentant du client",
  SUPPLIER = "Fournisseur",
  TECHNICIAN = "Technicien",
  LABORER = "Ouvrier",
  OTHER = "Autre"
}


export enum AttendanceStatuses {
  REGISTERED = "Inscrit",
  CONFIRMED = "Confirmé",
  CANCELLED = "Annulé",
  ATTENDED = "A participé",
  NO_SHOW = "Absent"
}

