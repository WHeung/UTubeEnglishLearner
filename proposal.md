
### **Development Proposal for YouTube Subtitle Word Tracker Plugin**

#### **1. Objectives**
- **Main Purpose**: The goal of this plugin is to create a Chrome extension that allows users to track words in YouTube subtitles and categorize them into three states: *Default*, *Known*, and *Unknown*. This will help users actively track and improve their vocabulary while watching YouTube videos.
- **User Interaction**: Users can mark words as known or unknown and view these words directly within the video interface, offering an interactive learning experience.

#### **2. Features**

1. **Subtitle Word Categorization**:
   - **Default**: Initially, all words in subtitles will be marked as "default."
   - **Known**: Words that the user marks as known (e.g., words they already understand).
   - **Unknown**: Words the user identifies as unfamiliar or needing further review.
   - Users can interact with subtitles by clicking on any word, and the word’s state can be changed to either "Known" or "Unknown."

2. **Input Known Words**:
   - Users can input a list of words they already know, and submit them to the plugin. These words will be stored for future reference and will be automatically categorized as "Known."
   - This feature will enable users to customize their vocabulary list and ensure they track only new words.

3. **UI for Tracking Known/Unknown Words**:
   - **Word Viewer**: A UI overlay that displays two categories: "Known" and "Unknown" words for the current video. This allows users to see their vocabulary progress.
   - The list of known/unknown words will be dynamically updated as the user interacts with subtitles.

4. **Word Highlighting**:
   - The plugin will modify the subtitle text in the video player to visually highlight known and unknown words, making it easier for users to track progress as they watch.
   - For example, known words could be displayed in green and unknown words in red, or similar visual cues could be used.

#### **3. Development Process**

1. **Chrome Extension Setup**:
   - Set up the basic structure for the Chrome extension with `manifest.json`, background scripts, and content scripts.
   - Define permissions to interact with YouTube and access subtitle data.

2. **Create the React Application for UI**:
   - Use **React** to build a dynamic UI for the plugin. The React app will handle the user interactions, such as marking words as known/unknown and displaying these changes in real time.
   - React will allow for efficient state management and provide an easy way to update the UI as users interact with subtitles.

3. **Subtitle Extraction and Management**:
   - Implement logic to extract subtitles from YouTube videos. This can be achieved by parsing the video’s subtitle data (e.g., using YouTube's built-in captioning system or available APIs).
   - Once subtitles are extracted, the plugin will monitor the current subtitle text and allow for interaction with specific words.

4. **Word State Management**:
   - Use **Chrome storage API** or **localStorage** to store the state of each word (known/unknown) across different videos and sessions.
   - Manage the state of words dynamically as users interact with subtitles.

5. **Input Known Words**:
   - Allow users to input and submit a list of words they already know. This will be saved in the plugin’s storage and used to categorize words as known.

6. **User Interface Design**:
   - Create an intuitive UI that allows users to:
     - View and interact with subtitles.
     - Track their known and unknown words.
     - Input and submit words they already know.
   - The UI will be displayed in a popup, and it will dynamically update as the video plays.

7. **Word Highlighting**:
   - Modify the appearance of subtitles on YouTube to visually differentiate between known and unknown words. This could involve changing the text color or applying background highlights to make the words stand out.
   - Ensure the subtitles are synced with the video playback to highlight words as they appear.

8. **Testing and Debugging**:
   - Thoroughly test the extension to handle edge cases, such as missing or improperly formatted subtitles, video pauses, and changes in playback speed.
   - Ensure compatibility across different browsers (though the main focus will be on Chrome).

9. **Deployment**:
   - After testing, package the extension and prepare it for submission to the **Chrome Web Store** for public distribution.
   - Provide clear documentation on how to install and use the plugin.

#### **4. Technologies**

- **Frontend**: HTML, CSS (for styling), JavaScript (for functionality), React (for the UI components).
- **Chrome Extension APIs**: For accessing YouTube subtitles and storing data locally.
- **State Management**: React’s `useState` for local component state or **Redux** for more advanced state management if necessary.
- **Storage**: Chrome’s `localStorage` API or the extension's built-in storage to save known/unknown word data.
- **Word Highlighting**: CSS for visual modifications (text color, background highlighting).

#### **5. Future Enhancements**

- **Multi-Language Support**: The plugin could be extended to support subtitles in multiple languages, allowing users to track their vocabulary across different languages.
- **User Profiles**: Allow users to save and sync their vocabulary list across devices or sessions using a backend service.
- **Analytics**: Provide users with analytics on their progress, such as the percentage of known words in a video or the number of new words learned.
