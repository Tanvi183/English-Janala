    // tailwind.config.js
    module.exports = {
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './index.html', // Example: include your main HTML file
      ],
      theme: {
        container: {
          center: true, // Centers the container
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
          },
        },
        extend: {},
      },
      plugins: [],
    };