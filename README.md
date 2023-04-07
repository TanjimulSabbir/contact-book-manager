# Address Book Manager
<p>Address Book Manager is a web application that allows users to store, manage, and edit their contacts. It is built using HTML, CSS, Reactjs, and Tailwind, and stores data in the browser's local storage. While local storage was used for simplicity's sake, it can easily be swapped out for a NoSQL database like MongoDB if needed.</p>

<h3>Features</h3>
- Add, edit, and delete contact information (name, phone number, and address).
- Contacts are stored in local storage and displayed on the UI.
- Unique contact information is enforced - duplicate entries are not allowed.
- Editing existing contacts is only allowed for the same person who originally created the contact.
- A search function is provided to allow users to search by name, phone number, or address
- The search function updates the search results in real-time as users type each character.

### Installation
<p>To run the application locally, clone this repository and run npm install to install the necessary dependencies. Then run npm start to start the server. The application should be available at http://localhost:3000/.</p>

### Future Improvements
<p>While this project is currently functional, there are several possible improvements that could be made in the future, including:</p>
- Adding authentication to prevent unauthorized access to contact information.
- Integrating with an external API to provide more comprehensive search results.
- Allowing users to group their contacts into categories.
- Improving the user interface and experience by adding animations or transitions.

### Description
<p>Address Book Manager is a comprehensive web application that enables users to manage their contact information with ease. The application has been developed using the latest front-end technologies such as HTML, CSS, Reactjs, and Tailwind. The database used in this project is Browser Local Storage, which has been used for simple comprehension purposes. However, if needed, the application can be updated to use a more robust NoSQL database like MongoDB.

The application offers a user-friendly interface where users can input their contact details such as name, phone number, and address. Once the user clicks on the "Add Contact" button, the information is saved on the local storage and displayed on the UI. Users can delete or edit their contact information with ease. However, the application does not allow editing of contacts with the same name, which ensures that each contact's information is unique.

The application's editing feature is elegant and user-friendly, and it opens a new screen window to enable the user to edit their contact information easily. The application also displays an error notification if a user attempts to input contact information that already exists.

In addition, the Address Book Manager application allows users to search for contacts by name, phone number, or address. Users can search using only one character and receive real-time results that update with each additional character entered.

Overall, the Address Book Manager application is a versatile and intuitive tool that simplifies contact management for users. With its sleek design and robust functionality, this application is an excellent choice for professionals who want to manage their contact information efficiently.</p>