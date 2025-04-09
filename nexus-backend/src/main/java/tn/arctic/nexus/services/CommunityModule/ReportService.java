package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Publication;
import tn.arctic.nexus.entities.Report;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.CommunityModule.PublicationRepository;
import tn.arctic.nexus.repositories.CommunityModule.ReportRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;

@Service

public class ReportService implements IReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private IUserRepository userRepository;


    @Override
    public Report createReport(Report report) {
        // On vérifie que la publication existe
        Publication publication = publicationRepository.findById(report.getPublication().getId())
                .orElseThrow(() -> new RuntimeException("Publication introuvable"));

        // On vérifie que l'utilisateur existe
        User user = userRepository.findById(report.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // On injecte les vraies entités complètes dans le report
        report.setPublication(publication);
        report.setUser(user);

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
