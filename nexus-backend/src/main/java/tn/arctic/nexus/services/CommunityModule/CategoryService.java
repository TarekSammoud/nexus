package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tn.arctic.nexus.entities.Category;
import tn.arctic.nexus.repositories.CommunityModule.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);  // Save the category
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();  // Return all categories
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);  // Return category by id
    }
    // Update Category by ID (PUT method)
    public Category updateCategory(Long id, Category updatedCategory) {
        // Find the category by id
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Update the fields of the category
        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());

        // Save the updated category
        return categoryRepository.save(category);
    }
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);  // Delete category by id
    }
}
