package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Report;

import java.util.List;

public interface IReportService {

    Report createReport(Report report);
    List<Report> getAllReports();
    Report getReportById(Long id);
    void deleteReport(Long id);
}
