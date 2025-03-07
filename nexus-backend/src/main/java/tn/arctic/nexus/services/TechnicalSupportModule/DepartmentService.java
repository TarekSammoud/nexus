package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Department;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IDepartmentRepository;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private IDepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }
}
