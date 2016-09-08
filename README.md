Contact Manager Inc
=======

## Licensing

The files in this repository are, unless stated otherwise, released under the Apache License. You are free to redistribute this code with or without modification. The full license text is available [here](http://www.apache.org/licenses/LICENSE-2.0).

Description
-----------

Contact Manager Inc is an Enterprise level company that is looking to develop a new web application that allows a user to manage their contacts from a dashboard. The dashboard would contain contact widgets to store information about friends, family and work colleagues. They want you to design and develop a system that can be passed on to the development team that would be built out with additional widgets and functionality using your design, code and data models. The following is a list of required functionality put together from the business team. Feel free to add additional functionality.

When the application logs in for a specific user, it should load all of the contacts.
The user needs to be able to add, edit or remove contacts.
When a user wants to add a user, it needs to allow input for at least the first name, last name, phone number, email, company and job title.
The widget needs to display the contact’s full name, phone number and email.
Clicking on the widget will display a popup that lists the complete contact information for the selected user.

Visit Sample Site: [https://contactmanager.matrixdigital.com](https://contactmanager.matrixdigital.com).


## Dependencies and Installation

Ensure Node is installed. This can be done through your package manager or from their [website](http://nodejs.org/).

Clone this repository:
```term
$ git clone https://github.com/flyingsparx/NodeDirectUploader.git
```

Change directory into the application and use `npm` to install the application's dependencies:
```term
$ cd NodeDirectUploader
$ npm install
```

## Running the application
* Set environment variables for your AWS access key, secret, and bucket name (see [companion article](https://devcenter.heroku.com/articles/s3-upload-node))
* Run `node app`
* Visit [localhost:3000/account](http://localhost:3000/account) to try it out


## Deploying the application

You can deploy a live copy of this application to Heroku with the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://github.com/rtorcato/contactmanager)
