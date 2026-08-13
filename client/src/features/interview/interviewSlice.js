import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as interviewApi from '../../api/interview.api';
import { getErrorMessage, parseApiError } from '../../utils/errors';

export const fetchAllReports = createAsyncThunk(
  'interview/fetchAllReports',
  async (_, { rejectWithValue }) => {
    try {
      return await interviewApi.getAllInterviewReports();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load reports.'));
    }
  }
);

export const fetchReportById = createAsyncThunk(
  'interview/fetchReportById',
  async (reportId, { rejectWithValue }) => {
    try {
      return await interviewApi.getInterviewReportById(reportId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load report.'));
    }
  }
);

export const createReport = createAsyncThunk(
  'interview/createReport',
  async (payload, { rejectWithValue }) => {
    try {
      return await interviewApi.createInterviewReport(payload);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Failed to generate interview analysis.')
      );
    }
  }
);

export const generateResume = createAsyncThunk(
  'interview/generateResume',
  async ({ reportId, title }, { rejectWithValue }) => {
    try {
      await interviewApi.downloadResumePdf(reportId, title);
      return reportId;
    } catch (error) {
      return rejectWithValue(
        await parseApiError(error, 'Failed to generate resume.')
      );
    }
  }
);

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    reports: [],
    selectedReport: null,
    isLoadingReports: false,
    isLoadingReport: false,
    isCreating: false,
    isGeneratingResume: false,
    generatingResumeId: null,
    error: null,
    createError: null,
    resumeError: null,
  },
  reducers: {
    clearInterviewErrors: state => {
      state.error = null;
      state.createError = null;
      state.resumeError = null;
    },
    clearSelectedReport: state => {
      state.selectedReport = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllReports.pending, state => {
        state.isLoadingReports = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.isLoadingReports = false;
        state.reports = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.isLoadingReports = false;
        state.error = action.payload;
      })
      .addCase(fetchReportById.pending, state => {
        state.isLoadingReport = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.isLoadingReport = false;
        state.selectedReport = action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.isLoadingReport = false;
        state.selectedReport = null;
        state.error = action.payload;
      })
      .addCase(createReport.pending, state => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isCreating = false;
        state.selectedReport = action.payload;
        state.reports = [action.payload, ...state.reports];
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload;
      })
      .addCase(generateResume.pending, (state, action) => {
        state.isGeneratingResume = true;
        state.generatingResumeId = action.meta.arg.reportId;
        state.resumeError = null;
      })
      .addCase(generateResume.fulfilled, state => {
        state.isGeneratingResume = false;
        state.generatingResumeId = null;
      })
      .addCase(generateResume.rejected, (state, action) => {
        state.isGeneratingResume = false;
        state.generatingResumeId = null;
        state.resumeError = action.payload;
      });
  },
});

export const { clearInterviewErrors, clearSelectedReport } =
  interviewSlice.actions;
export default interviewSlice.reducer;
