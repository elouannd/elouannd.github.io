# Elouann's Personal Website

This project is Elouann's personal website, showcasing plugins, apps, and other creations.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Running the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

### Building for Production

```bash
npm run build
```
This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes. Your app is ready to be deployed.

See the Create React App section on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Key Features

- **Homepage:** Displays a welcome message and main title.
    - The main navigation links (Plugins, Apps, Autre, Contact) are currently configured to be visible only during development (`process.env.NODE_ENV === 'development'`).
- **Plugins Page:** Showcases various audio plugins with descriptions, OS compatibility, formats, and download links.
- **Other Sections:** (Describe Apps, Autre, Contact pages briefly once their content is known or implemented)

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production.
- `npm run eject`: **Note: this is a one-way operation.** Removes the single build dependency and copies configuration files and transitive dependencies into your project for full control. Use this only if you are not satisfied with the default build tool and configuration choices.

## Learn More

- To learn React, check out the [React documentation](https://reactjs.org/).
- For more information about Create React App, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Testing Mobile Responsiveness

After making changes to CSS or layout, it's important to test how the application looks and behaves on different screen sizes. Here's how you can do this using most modern web browsers:

1.  **Open your browser's Developer Tools:**
    *   Right-click on the page and select "Inspect" or "Inspect Element".
    *   Alternatively, use keyboard shortcuts:
        *   `Cmd + Opt + I` (Mac)
        *   `Ctrl + Shift + I` (Windows/Linux)

2.  **Toggle Device Toolbar:**
    *   In the Developer Tools panel, look for an icon that looks like a phone and tablet, or text like "Toggle device toolbar". Click it.
    *   Keyboard shortcut: `Cmd + Shift + M` (Mac) or `Ctrl + Shift + M` (Windows/Linux).

3.  **Select Different Devices or Screen Sizes:**
    *   The device toolbar allows you to select from a list of predefined devices (e.g., iPhone, iPad, Android devices) to simulate their screen sizes and resolutions.
    *   You can also choose "Responsive" and manually drag the edges of the viewport to see how the layout changes at various widths and heights.

4.  **What to Check:**
    *   **Layout:** Ensure elements don't overlap, content isn't cut off, and the layout adapts logically to the screen size (e.g., multi-column layouts becoming single-column).
    *   **Readability:** Check that text is legible, font sizes are appropriate, and there's enough contrast.
    *   **Tap Targets:** Make sure buttons, links, and other interactive elements are large enough to be easily tapped on a touch screen.
    *   **Navigation:** Verify that navigation menus are usable (e.g., a hamburger menu might appear on smaller screens).
    *   **Images and Media:** Confirm that images scale correctly and don't break the layout.

5.  **Test on Key Pages:**
    *   **Homepage:** Check the main title, navigation (if visible), and footer.
    *   **Plugins Page:** Verify the plugin grid, card layout, text within cards, and download buttons.
    *   (Test other pages like Apps, Autre, Contact as they are developed).

By following these steps, you can identify and fix responsiveness issues to ensure a good user experience across a wide range of devices.
