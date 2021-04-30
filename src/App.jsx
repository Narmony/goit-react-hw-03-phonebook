import { Component } from 'react';
import ContactsForm from './components/ContactsForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    // const state = {
    //   id: uuidv4(),
    //   name,
    //   number,
    // };
    // const visibleContacts = this.getVisibleContacts();
    // const vis = visibleContacts.find(nam => nam.name === name);

    // console.log(visibleContacts);
    // console.log(vis);
    const checkedName = this.state.contacts
      .map(contact => contact.name)
      .includes(name);

    if (checkedName) {
      alert(`${name} is already in contacts`);
      return;
    }
    // if (vis) {
    //   alert(`${name} is already in contacts`);
    //   return;
    // }
    this.setState(prevState => ({
      contacts: [{ id: uuidv4(), name, number }, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('app component did update');

    if (this.state.contacts !== prevState.contacts) {
      console.log('changes');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <div className="app">
        <ContactsForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={visibleContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
