// ============================================================================
//  Seed — populates dev.db with a believable CJBS community + an example domain.
//  Run automatically on `npm install`, or manually with `npm run db:seed`.
//  Re-running is safe: it clears and re-inserts (idempotent).
// ============================================================================
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_PASSWORD = "student1234";
const STAFF_PASSWORD = "staff1234";

const students = [
  { cjbsId: "MBA-2026-0142", name: "Aisha Al-Sabah", program: "MBA", cohort: "2026" },
  { cjbsId: "MBA-2026-0188", name: "James Whitfield", program: "MBA", cohort: "2026" },
  { cjbsId: "MBA-2026-0203", name: "Priya Nair", program: "MBA", cohort: "2026" },
  { cjbsId: "MFN-2026-0061", name: "Chen Wei", program: "MFin", cohort: "2026" },
  { cjbsId: "MFN-2026-0074", name: "Sofia Rossi", program: "MFin", cohort: "2026" },
  { cjbsId: "MST-2026-0019", name: "Omar Haddad", program: "MST", cohort: "2026" },
  { cjbsId: "MST-2026-0027", name: "Lena Bergström", program: "MST", cohort: "2026" },
  { cjbsId: "MAC-2026-0033", name: "David Okafor", program: "MAcc", cohort: "2026" },
  { cjbsId: "EMB-2025-0112", name: "Fatima Zahra", program: "EMBA", cohort: "2025" },
  { cjbsId: "EMB-2025-0125", name: "Thomas Müller", program: "EMBA", cohort: "2025" },
  { cjbsId: "PHD-2024-0008", name: "Yuki Tanaka", program: "PhD", cohort: "2024" },
  { cjbsId: "MBA-2026-0211", name: "Grace Mwangi", program: "MBA", cohort: "2026" },
];

const staff = [
  { staffId: "STAFF-014", name: "Dr. Eleanor Vance", role: "Programme Director", department: "MBA Programme" },
  { staffId: "STAFF-021", name: "Rajiv Menon", role: "Careers Coach", department: "Careers & Recruitment" },
  { staffId: "STAFF-007", name: "Hannah Brooks", role: "Admissions Officer", department: "Admissions" },
  { staffId: "STAFF-033", name: "Dr. Marcus Feld", role: "Faculty", department: "Strategy & Marketing" },
  { staffId: "STAFF-040", name: "Claire Dubois", role: "Student Experience Lead", department: "Student Affairs" },
];

const electives = [
  { code: "E-501", title: "Venture Capital & Private Equity", department: "Finance", faculty: "Dr. Marcus Feld", credits: 3, capacity: 40, term: "Michaelmas", schedule: "Tue 14:00–16:00", description: "Deal structuring, term sheets, and portfolio strategy for early- and growth-stage investing." },
  { code: "E-512", title: "Digital Marketing Analytics", department: "Marketing", faculty: "Dr. Priya Shah", credits: 3, capacity: 35, term: "Michaelmas", schedule: "Wed 09:00–11:00", description: "Attribution, experimentation, and measuring ROI across modern marketing channels." },
  { code: "E-523", title: "Negotiation & Influence", department: "Organisational Behaviour", faculty: "Dr. Eleanor Vance", credits: 3, capacity: 30, term: "Lent", schedule: "Mon 13:00–15:00", description: "Interest-based bargaining, coalition building, and high-stakes negotiation simulations." },
  { code: "E-534", title: "Entrepreneurial Finance", department: "Finance", faculty: "Dr. Anil Gupta", credits: 3, capacity: 38, term: "Lent", schedule: "Thu 10:00–12:00", description: "Funding the venture: cap tables, valuation, convertible notes, and exit planning." },
  { code: "E-545", title: "Strategy in the Digital Economy", department: "Strategy", faculty: "Dr. Marcus Feld", credits: 3, capacity: 42, term: "Michaelmas", schedule: "Fri 11:00–13:00", description: "Platform competition, network effects, and strategy under technological disruption." },
  { code: "E-556", title: "Sustainable Business & ESG", department: "Strategy", faculty: "Dr. Sara Lindqvist", credits: 3, capacity: 36, term: "Easter", schedule: "Tue 09:00–11:00", description: "Embedding sustainability into strategy, reporting, and stakeholder capitalism." },
  { code: "E-567", title: "Data-Driven Decision Making", department: "Analytics", faculty: "Dr. Yuki Tanaka", credits: 3, capacity: 32, term: "Lent", schedule: "Wed 14:00–16:00", description: "From data to decisions: causal inference, dashboards, and judgement under uncertainty." },
  { code: "E-578", title: "Leadership & Organisational Change", department: "Organisational Behaviour", faculty: "Dr. Claire Dubois", credits: 3, capacity: 30, term: "Easter", schedule: "Thu 13:00–15:00", description: "Leading transformation: change models, culture, and influence without authority." },
];

async function main() {
  console.log("🌱 Seeding CJBS workshop database…");

  // Clear (order matters for FKs)
  await prisma.electiveSelection.deleteMany();
  await prisma.elective.deleteMany();
  await prisma.student.deleteMany();
  await prisma.staff.deleteMany();

  // Students
  for (const s of students) {
    await prisma.student.create({
      data: {
        cjbsId: s.cjbsId,
        name: s.name,
        email: `${s.name.toLowerCase().replace(/[^a-z]+/g, ".")}@cjbs.cam.ac.uk`,
        program: s.program,
        cohort: s.cohort,
        avatarInitials: s.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
        password: DEMO_PASSWORD,
      },
    });
  }

  // Staff
  for (const s of staff) {
    await prisma.staff.create({
      data: {
        staffId: s.staffId,
        name: s.name,
        email: `${s.name.toLowerCase().replace(/[^a-z]+/g, ".")}@jbs.cam.ac.uk`,
        role: s.role,
        department: s.department,
        avatarInitials: s.name.replace(/^Dr\.?\s+/i, "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
        password: STAFF_PASSWORD,
      },
    });
  }

  // Electives (example domain)
  const createdElectives = [];
  for (const e of electives) {
    createdElectives.push(await prisma.elective.create({ data: e }));
  }

  // A couple of selections so a signed-in student sees state on the dashboard
  const aisha = await prisma.student.findUnique({ where: { cjbsId: "MBA-2026-0142" } });
  if (aisha) {
    await prisma.electiveSelection.create({
      data: { studentId: aisha.id, electiveId: createdElectives[0].id, status: "confirmed" },
    });
    await prisma.electiveSelection.create({
      data: { studentId: aisha.id, electiveId: createdElectives[4].id, status: "selected" },
    });
  }

  console.log(`✅ Seeded ${students.length} students, ${staff.length} staff, ${electives.length} electives.`);
  console.log(`   Demo login → CJBS ID: MBA-2026-0142   Password: ${DEMO_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
