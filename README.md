
---

# NASAAPOD React Frontend with Spring Boot Backend Integration

This project combines a React frontend with a Spring Boot backend to create a full-stack web application. The frontend is built using webpack, and the bundled files are integrated into the Spring Boot application using Thymeleaf templates.

## Building the React Frontend with Webpack

Webpack is used to bundle the React application's JavaScript, CSS, and other assets into a single file that can be easily served by the Spring Boot backend. Here's how the webpack configuration accomplishes this:

- **Entry Point:** The main JavaScript file (`index.js` or similar) serves as the entry point for the React application.
- **Output Configuration:** The bundled file (`bundle.js`) is generated in a specified directory (`ubiquitous-enigma/src/main/resources/static/built/`) of the Spring Boot project.
- **Loaders:** Various loaders are configured to process different types of files. For example, Babel loader transpiles JavaScript files, CSS loader and style loader process CSS files, and url loader handles image and font files.

## Using Built Files via Thymeleaf in Spring Boot

Once the React application is built, the generated `bundle.js` file is integrated into the Spring Boot application using Thymeleaf templates. Here's how you can include the bundled JavaScript file in your Thymeleaf templates:

```html
<script th:src="@{/built/bundle.js}" defer></script>
```

In this example, `@{/built/bundle.js}` is a Thymeleaf expression that resolves to the path of the bundled JavaScript file relative to the `static` directory. This ensures that the correct path is used when the Thymeleaf template is rendered.

## Getting Started

To get the project up and running on your local machine, follow these steps:

### 1. Clone the Repository

Clone the project repository to your local machine using Git:

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Build the React Frontend

Navigate to the `src/` directory, where the React frontend is located:

```bash
cd src/
```

Install the required dependencies and build the React application using npm:

```bash
npm install     # Install dependencies
npm run build   # Build the React application
```

This will generate the bundled JavaScript file (`bundle.js`) and other necessary files in the `ubiquitous-enigma/src/main/resources/static/built/` directory of the Spring Boot project.

### 3. Run the Spring Boot Backend

Navigate to the `ubiquitous-enigma/` directory, where the Spring Boot backend is located:

```bash
cd ../ubiquitous-enigma/
```

Run the Spring Boot application using the Gradle `bootRun` command:

```bash
./gradlew bootRun    # Run the Spring Boot application
```

This command will compile and run the Spring Boot backend. Once the application is started, it will be accessible at `http://localhost:8080`.

### 4. Access the Application

Open your web browser and navigate to `http://localhost:8080` to access the application. You should see the React frontend served by the Spring Boot backend.

## Additional Information

- Make sure you have Node.js, npm, and Java 17 installed on your system before running the project.
- Customize the webpack configuration and Thymeleaf templates as needed for your specific project requirements.
- Explore the project structure and codebase to understand how the frontend and backend are integrated and how data flows between them.
- to set up java 17 on gitpod/linux
```
sudo apt update

sudo apt install openjdk-17-jdk -y

sudo update-alternatives --config java

JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"

export PATH=$JAVA_HOME/bin:$PATH

```

---
# Project Structure

we have a project structure that includes both a React frontend and a Spring Boot backend. Here's a breakdown of the directories and files:

```
.                           # Root directory
├── b11513ec41e5f4b223d9.woff       # Font file
├── db000d08a7fc8ca90894.woff2      # Font file
├── package.json                    # NPM package configuration file
├── package-lock.json               # NPM package lock file
├── Project presentation - Made with Clipchamp.mp4  # Video presentation file
├── project_Struct.txt              # Text file ( related to project structure)
├── public/                         # Public directory for the React frontend
│   ├── favicon.ico                 # Favicon icon file
│   ├── index.html                  # Main HTML file for the React app
│   ├── logo192.png                 # Logo image file
│   ├── logo512.png                 # Logo image file
│   ├── manifest.json               # Web app manifest file
│   └── robots.txt                  # Robots.txt file
├── README.md                       # Readme file for the project
├── src/                            # Source directory for the React frontend
│   ├── ApiUsage.js                 # JavaScript file ( API usage related)
│   ├── App.css                     # CSS file for the main React component
│   ├── App.js                      # Main React component file
│   ├── App.test.js                 # Test file for the main React component
│   ├── FormPage.js                 # JavaScript file ( related to a form page)
│   ├── Home.js                     # JavaScript file ( related to the home page)
│   ├── index.css                   # CSS file for the index
│   ├── index.js                    # JavaScript file for the index
│   ├── logo.svg                    # SVG image file (logo)
│   ├── reportWebVitals.js          # JavaScript file (reporting web vitals)
│   ├── Result.js                   # JavaScript file ( related to displaying results)
│   └── setupTests.js               # Setup file for React tests
└── ubiquitous-enigma/              # Directory for the Spring Boot backend
    ├── build.gradle                # Gradle build configuration file
    ├── gradle/                     # Directory containing Gradle-related files
    │   └── wrapper/                # Gradle wrapper files
    │       └── gradle-wrapper.properties  # Gradle wrapper configuration file
    ├── gradlew                     # Gradle wrapper script (for Unix-based systems)
    ├── gradlew.bat                 # Gradle wrapper script (for Windows)
    ├── HELP.md                     # Help file
    ├── image-1.png                 # Image file
    ├── image-2.png                 # Image file
    ├── image-3.png                 # Image file
    ├── image.png                   # Image file
    ├── readme.md                   # Readme file
    ├── settings.gradle             # Gradle settings file
    ├── src/                        # Source directory for the Spring Boot backend
    │   ├── main/                   # Main source directory
    │   │   ├── java/               # Java source code directory
    │   │   │   └── com/
    │   │   │       └── example/
    │   │   │           └── demo/   # Package directories for Java source code
    │   │   │               ├── DemoApplication.java  # Main Spring Boot application class
    │   │   │               ├── domain/               # Directory for domain classes
    │   │   │               │   └── Greeting.java     # Example domain class
    │   │   │               ├── Hello.java            # Example Java class
    │   │   │               ├── HomeController.java  # Example controller class
    │   │   │               └── NasaApodapi.java     # Example API class
    │   │   └── resources/          # Resource directory
    │   │       ├── application.properties         # Application configuration properties
    │   │       ├── static/                        # Static resources directory
    │   │       │   └── built/                     # Directory for built frontend files
    │   │       │       ├── bundle.js              # Main JavaScript bundle
    │   │       │       └── node_modules_web-vitals_dist_web-vitals_js.bundle.js  # Additional JavaScript bundle
    │   │       └── templates/                     # Thymeleaf templates directory
    │   │           ├── favicon.ico               # Favicon file
    │   │           ├── index.html                # Main HTML template
    │   │           ├── logo192.png               # Logo image file
    │   │           ├── logo512.png               # Logo image file
    │   │           ├── manifest.json             # Web app manifest file
    │   │           └── robots.txt                # Robots.txt file
    │   └── test/                          # Test source directory
    │       └── java/                      # Java test source code directory
    │           └── com/
    │               └── example/
    │                   └── demo/
    │                       └── DemoApplicationTests.java  # Example test class for Spring Boot application
    └── tests.http                       # HTTP request file for testing (example)
└── webpack.config.js                 # Webpack configuration file for the React frontend
```

This structure indicates a project with a React frontend (`src/` directory) and a Spring Boot backend (`ubiquitous-enigma/` directory). The React frontend includes components, tests, and configuration files, while the Spring Boot backend includes Java source code, resource files, and Gradle build configuration. Additionally, there are font files, video presentations, and miscellaneous files such as `README.md` and `package.json`.