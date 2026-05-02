type DummyCourse = {
  title: string;
  description: string;
  type: "group" | "private";
  teacherEmail: string;
  startDate: string;
  endDate: string;
  days: ("saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday")[];
  durationMinutes: number;
  studentEmails: string[];
};

const COURSES: DummyCourse[] = [
  {
    title: "Advanced Mathematics",
    description:
      "Calculus, linear algebra, and advanced mathematical concepts for senior students.",
    type: "group",
    teacherEmail: "sarah.mitchell@edura.com",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    days: ["sunday", "tuesday", "thursday"],
    durationMinutes: 90,
    studentEmails: [
      "liam.johnson@edura.com",
      "olivia.williams@edura.com",
      "noah.brown@edura.com",
      "emma.jones@edura.com",
      "ethan.garcia@edura.com",
      "ava.martinez@edura.com",
      "sophia.davis@edura.com",
      "mason.rodriguez@edura.com",
    ],
  },
  {
    title: "Physics Fundamentals",
    description:
      "Mechanics, thermodynamics, and electromagnetism with lab experiments.",
    type: "group",
    teacherEmail: "david.chen@edura.com",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    days: ["monday", "wednesday"],
    durationMinutes: 90,
    studentEmails: [
      "liam.johnson@edura.com",
      "noah.brown@edura.com",
      "ethan.garcia@edura.com",
      "isabella.wilson@edura.com",
      "james.anderson@edura.com",
      "benjamin.jackson@edura.com",
    ],
  },
  {
    title: "English Literature",
    description:
      "Analysis of classic and contemporary literary works, essay writing, and critical thinking.",
    type: "group",
    teacherEmail: "emily.roberts@edura.com",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    days: ["sunday", "tuesday"],
    durationMinutes: 60,
    studentEmails: [
      "olivia.williams@edura.com",
      "emma.jones@edura.com",
      "ava.martinez@edura.com",
      "charlotte.thomas@edura.com",
      "amelia.white@edura.com",
      "mia.clark@edura.com",
      "harper.robinson@edura.com",
      "evelyn.young@edura.com",
      "abigail.wright@edura.com",
      "ella.adams@edura.com",
    ],
  },
  {
    title: "Computer Science 101",
    description:
      "Introduction to programming, data structures, and algorithms using Python.",
    type: "group",
    teacherEmail: "david.chen@edura.com",
    startDate: "2026-03-15",
    endDate: "2026-07-15",
    days: ["monday", "wednesday", "thursday"],
    durationMinutes: 120,
    studentEmails: [
      "liam.johnson@edura.com",
      "noah.brown@edura.com",
      "lucas.harris@edura.com",
      "alexander.walker@edura.com",
      "daniel.king@edura.com",
      "jackson.scott@edura.com",
      "sebastian.baker@edura.com",
      "jack.nelson@edura.com",
      "owen.campbell@edura.com",
      "nathan.edwards@edura.com",
      "leo.flores@edura.com",
      "hunter.nguyen@edura.com",
    ],
  },
  {
    title: "Chemistry Lab",
    description:
      "Organic and inorganic chemistry with hands-on laboratory experiments.",
    type: "group",
    teacherEmail: "michael.adams@edura.com",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    days: ["sunday", "wednesday"],
    durationMinutes: 120,
    studentEmails: [
      "ethan.garcia@edura.com",
      "sophia.davis@edura.com",
      "benjamin.jackson@edura.com",
      "lucas.harris@edura.com",
      "mia.clark@edura.com",
      "henry.lewis@edura.com",
      "ryan.parker@edura.com",
      "chloe.evans@edura.com",
    ],
  },
  {
    title: "World History",
    description:
      "Survey of major world civilizations, events, and historical movements.",
    type: "group",
    teacherEmail: "jessica.taylor@edura.com",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    days: ["tuesday", "thursday"],
    durationMinutes: 60,
    studentEmails: [
      "olivia.williams@edura.com",
      "emma.jones@edura.com",
      "mason.rodriguez@edura.com",
      "charlotte.thomas@edura.com",
      "amelia.white@edura.com",
      "harper.robinson@edura.com",
      "evelyn.young@edura.com",
      "scarlett.hill@edura.com",
      "grace.mitchell@edura.com",
      "hannah.stewart@edura.com",
      "aria.morris@edura.com",
      "penelope.murphy@edura.com",
      "lily.collins@edura.com",
      "zoey.phillips@edura.com",
    ],
  },
  {
    title: "Private Algebra Tutoring",
    description:
      "One-on-one sessions focused on algebra fundamentals and problem-solving techniques.",
    type: "private",
    teacherEmail: "sarah.mitchell@edura.com",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    days: ["monday"],
    durationMinutes: 60,
    studentEmails: ["henry.lewis@edura.com"],
  },
  {
    title: "Private Essay Writing",
    description:
      "Personalized coaching on academic writing, thesis development, and argumentation.",
    type: "private",
    teacherEmail: "emily.roberts@edura.com",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    days: ["wednesday"],
    durationMinutes: 45,
    studentEmails: ["samuel.turner@edura.com"],
  },
  {
    title: "Biology & Life Sciences",
    description:
      "Cell biology, genetics, ecology, and human anatomy with dissection labs.",
    type: "group",
    teacherEmail: "michael.adams@edura.com",
    startDate: "2026-03-15",
    endDate: "2026-07-15",
    days: ["monday", "thursday"],
    durationMinutes: 90,
    studentEmails: [
      "isabella.wilson@edura.com",
      "james.anderson@edura.com",
      "alexander.walker@edura.com",
      "daniel.king@edura.com",
      "emily.green@edura.com",
      "aiden.carter@edura.com",
    ],
  },
  {
    title: "Private Physics Prep",
    description:
      "Targeted preparation for physics exams covering mechanics and electromagnetism.",
    type: "private",
    teacherEmail: "david.chen@edura.com",
    startDate: "2026-04-15",
    endDate: "2026-06-15",
    days: ["sunday"],
    durationMinutes: 60,
    studentEmails: ["ryan.parker@edura.com"],
  },
];

export default COURSES;
