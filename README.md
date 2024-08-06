# Post Page with OG Image Generation

## Overview

This project is a React application that provides a static post page where users can input a title, content, and optionally an image. The application dynamically generates an Open Graph (OG) image based on the post content, including the title, a snippet of the content, and any associated image.

## Features

- Input fields for title, content, and optional image upload.
- Dynamic generation of OG image (1200x630 pixels) based on post content.
- Automatic addition of the `og:image` meta tag to the HTML.
- Copyable URL for the generated OG image.
- Theme toggle between light and dark modes.
- Visual preview of the generated OG image.

## Requirements

- Node.js and npm installed on your machine.
- Basic understanding of React and CSS.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/post-page-og-image.git
   cd post-page-og-image
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. **Enter Post Details**

   - Fill in the "Title" and "What's happening?" fields.
   - Optionally, upload an image by clicking the image icon and selecting a file.

2. **Generate OG Image**

   - Click the "Generate OG Image" button.
   - A preview of the generated OG image will be displayed below the form.

3. **Copy OG Image URL**

   - Copy the generated OG image URL by clicking the copy button next to the URL input field.

4. **Toggle Theme**

   - Switch between light and dark themes using the theme toggle button at the bottom right corner.

## Source Code

The source code for this project can be found in the following files:

- `src/PostPage.js`: The main React component for the post page.
- `src/postPage.css`: CSS file containing the styling for the post page and OG image preview.

## Key Libraries

- **React**: Frontend library for building user interfaces.
- **html2canvas**: Library for capturing screenshots of HTML elements and generating images.
- **react-helmet-async**: Library for managing changes to the document head, including meta tags.

## CSS Styles

The CSS styles include themes for light and dark modes, form styling, and OG image styling. You can customize these styles in `postPage.css` to match your branding or design preferences.

### Final Note

Working on this assignment has been a fantastic learning experience. I wasn’t aware of what Open Graph (OG) images were before this, so diving into this project really opened my eyes. It’s been a lot of fun and I’ve learned a ton about designing and creating these images. Overall, it’s been a great opportunity to grow my skills and explore something new!
