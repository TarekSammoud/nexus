package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Report;
import tn.arctic.nexus.repositories.CommunityModule.ReportRepository;

import java.util.List;

@Service

public class ReportService implements IReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @Override
    public Report getReportById(Long id) {
        return reportRepository.findById(id)
                .orElseThrow();
    }

    @Override
    public void deleteReport(Long id) {
        Report report = getReportById(id);
        reportRepository.delete(report);
    }


    @Override
    public Report updateReport(Long id, Report report) {
        Report existingReport = getReportById(id);

        existingReport.setReason(report.getReason());
        existingReport.setStatus(report.getStatus());
        existingReport.setUser(report.getUser());
        existingReport.setPublication(report.getPublication());

        return reportRepository.save(existingReport);
    }

}
