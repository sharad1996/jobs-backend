const description = `# Job Details

Cusutomizable text

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |
`;

exports.seed = async (knex) => {
  console.log("4th seed - jobs");
  // delete all (will also clean jobs_tags and jobs_culture_values)
  await knex("jobs").del();

  // Get companies
  const companies = await knex("companies");

  const companyIds = companies.map((company) => company.id);
  return knex("jobs").insert([
    {
      name: "Fullstack Developer",
      company_id: companyIds[0],
      description,
    },
    {
      name: "Fullstack JS Developer",
      company_id: companyIds[1],
      description,
    },
    {
      name: "DevOps Engineer",
      company_id: companyIds[1],
      description,
    },
    {
      name: "DevOps Engineer",
      company_id: companyIds[0],
      description,
    },
    {
      name: "DevOps Team Lead",
      company_id: companyIds[0],
      description,
    },
  ]);
};
