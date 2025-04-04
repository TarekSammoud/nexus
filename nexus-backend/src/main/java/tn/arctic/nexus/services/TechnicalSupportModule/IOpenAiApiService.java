package tn.arctic.nexus.services.TechnicalSupportModule;

public interface IOpenAiApiService {

    // Method to send the user's prompt to the OpenAI API and get the response
    String getChatGptResponse(String prompt);

}
