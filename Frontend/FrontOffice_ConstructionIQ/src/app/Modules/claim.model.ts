export interface Claim {
  id: number;
  sender: string;
  receiver: string;
  numberOfCharacters: number;
  containsUrgent: boolean;
  containsImportant: boolean;
  urgencyClassification: string;
  sendDate: Date;
  sendTime: Date;
  claimType: string;
  initialPriority: string;
  numberOfAttachments: number;
  messageLanguage: string;
}
