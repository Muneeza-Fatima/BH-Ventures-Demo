/* =========================================================
   CAREERS — JOB DATA

   No verified vacancies exist yet, so this array is empty on
   purpose rather than filled with placeholder listings. Add
   real, approved roles here and the Open Positions section
   (filters, grid, and modal) picks them up automatically.
   ========================================================= */

export type CareerJob = {
  id: string;
  title: string;
  location: string;
  department: string;
  employmentType: string;
  aboutRole: string;
  requirements: string[];
  applyHref: string;
};

export const careerJobs: CareerJob[] = [];
