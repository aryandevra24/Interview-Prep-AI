import apiClient from './axios';

export const createInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('selfDescription', selfDescription);
  formData.append('jobDescription', jobDescription);

  const { data } = await apiClient.post('/interview', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.data.interviewReport;
};

export const getAllInterviewReports = async () => {
  const { data } = await apiClient.get('/interview/report/all');
  return data.data.interviewReports;
};

export const getInterviewReportById = async interviewReportId => {
  const { data } = await apiClient.get(
    `/interview/report/${interviewReportId}`
  );
  return data.data.interviewReport;
};

export const downloadResumePdf = async (interviewReportId, title) => {
  const response = await apiClient.get(
    `/interview/resume/${interviewReportId}`,
    {
      responseType: 'blob',
    }
  );

  const disposition = response.headers['content-disposition'];
  let filename = `resume_${title || 'tailored'}.pdf`;

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) filename = match[1];
  }

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
