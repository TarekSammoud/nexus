package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    void deleteCategory(Long id);
}
