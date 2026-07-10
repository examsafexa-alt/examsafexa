export interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  examSelected?: string; // Exam["_id"]
  examCenterSelected?: string; // ExamCenter["_id"]
  parentEmail?: string; // optional — powers the women's-safety notification flow
  liveLocationOptIn: boolean;
  notificationPrefs?: {
    parentEmailOnJourney: boolean;
  };
  createdAt: Date;
}

export interface Exam {
  name: string;
  code: string; // e.g. "NEET", "JEE-MAIN", "UPSC-CSE"
  examDate?: Date;
  category:
    | "central-government"
    | "judiciary-legal"
    | "state-government"
    | "psu-recruitment"
    | "university-entrance"
    | "professional-bodies"
    | "school-boards"
    | "international"
    | "medical"
    | "engineering"
    | "civil-services"
    | "state-psc"
    | "ssc"
    | "other";
  group?: string;
  conductingBody?: string;
  purpose?: string;
  sourceSheet?: string;
}

export interface ExamCenter {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  examIds: string[];
}

export interface Community {
  examId: string;
  examCenterId: string;
  memberIds: string[];
  scope: "center";
  createdAt: Date;
}

// Phase 2+ — live location sharing (women's safety layer)
export interface LocationShare {
  userId: string;
  communityId?: string;
  isActive: boolean;
  shareToken?: string;
  lastLocation?: { lat: number; lng: number; accuracy?: number; updatedAt: Date };
  journeyStartedAt?: Date;
  journeyEndedAt?: Date;
  parentNotifiedAt?: Date;
}
