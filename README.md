# EDU — Education NGO Website

**Live Demo:** https://edu-ngo-org.vercel.app/

## About

EDU is a fictional NGO website created for the Mini Impact Spotlight Page challenge.

The concept focuses on education, learning opportunities, mentorship, digital learning,
and community support for children.

## My Approach

I wanted the website to feel like a real education-focused NGO rather than a
regular NGO template.

The page follows a simple story:

**Problem → Impact → Mission → Work → Stories → Get Involved**

The idea is to first make the visitor understand the problem, then show the impact,
explain the mission, show how the organization helps, and finally guide them towards
taking action.

I kept the content simple and easy to understand so visitors can quickly know
what EDU does, why it matters, and how they can help.

## Design & Visual Direction

I used education-related images throughout the website so the purpose of the NGO
is clear from the first impression.

The color palette is intentionally limited and natural.

I wanted the overall design to feel calm, warm, natural, and comfortable to look at,
instead of using too many bright or distracting colors.

The same palette is used across different sections to keep the website consistent
and give it a clear visual identity.

I also used a floating header to make the navigation feel more interactive and
to keep important navigation and the main CTA easily accessible.

## Content Flow

The website starts with a strong hero section to create the first impression.

It then introduces the education access problem through the message:

**"Talent is everywhere. Opportunity isn't."**

After that, the impact numbers show how many children, volunteers, schools, and
communities the initiative has reached.

The Mission section then explains what EDU believes and what it wants to achieve.

The next section explains how EDU helps children through learning, access,
connection, and growth.

The Stories section adds real education-related references from UNICEF India,
which gives the page more real-world context.

The final sections explain why support matters and guide visitors towards
the Get Involved form.

## Impact Statistics

The impact statistics are stored separately in a JSON file:

`data/stats.json`

The JavaScript fetches the JSON data and displays the values dynamically.

This keeps the statistics separate from the HTML and makes them easier to update.

The numbers are also shown with a small count-up animation when the section
comes into view.

## Get Involved & Lead Flow

The Get Involved section is designed with a clear purpose instead of only
showing a contact form.

Each option has a short explanation so visitors understand what their action means.

- **Volunteer** — Share your time, knowledge or skills.
- **Donate** — Help provide learning resources and educational opportunities.
- **Partner** — Work with EDU to support children and communities.
- **Sponsor** — Support a learning programme, classroom or educational initiative.

The CTA buttons throughout the page mainly lead visitors towards this section.

This creates a simple journey:

**Understand → Build Interest → See the Impact → Take Action**

The form includes basic client-side validation for the required fields and
shows a success message after valid submission.

## SEO & Content

The page uses meaningful headings, descriptive content, semantic HTML,
image alt text, page title, and meta description.

The content is written around relevant education-focused terms such as
children, education, learning, mentorship, digital resources, and opportunities.

The goal was to keep the SEO content natural while still making the purpose
of the website clear to search engines and visitors.

## Responsive Design

The website is designed to work across desktop, tablet, and mobile screens.

The layout, typography, navigation, statistics, images, CTA sections, and form
adapt based on the screen size.

The desktop navigation changes into a mobile menu on smaller screens.

## Performance

Most website images are stored in **WebP** format to reduce image size and
improve loading performance.

The logo is kept as **PNG** because it is a small brand asset.

Images that are not immediately required are lazy-loaded, while the main hero
image is prioritized for the initial page experience.

## Interactions

The website includes:

- Floating/sticky header
- Mobile navigation
- Scroll-based reveal animations
- Hero parallax effect
- Animated impact statistics
- Interactive involvement options
- Client-side form validation

## Real-world References

The EDU organization and its impact numbers are fictional.

For the Stories section, I linked to real education-related stories from
UNICEF India instead of presenting fictional stories as real case studies.

This gives the website real educational context while keeping the fictional
nature of the project clear.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- Vercel

I chose Vanilla HTML, CSS, and JavaScript instead of React because this was a
single-page challenge and did not require a frontend framework.

This kept the project lightweight and allowed more focus on the visual design,
user experience, responsiveness, and required functionality.

## Tradeoffs

Because the challenge was time-limited, I focused on the most important parts:

- Clear user experience
- Strong visual design
- Responsive layout
- Simple content flow
- Dynamic statistics
- Interactive elements
- Client-side form validation
- Clear lead-generation flow

I avoided adding unnecessary backend functionality that was not required
for the challenge.

The form currently performs client-side validation only, and the statistics
use a simple JSON file.

For a production version, these could be connected to a real backend,
CRM, email service, CMS, or API.

## Project Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── stats.json
└── assets/
    └── images/