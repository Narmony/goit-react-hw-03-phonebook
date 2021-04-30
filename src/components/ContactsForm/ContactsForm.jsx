import styles from './contactsForm.module.css';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    // this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Phonebook</h2>
        <div className={styles.form}>
          <label htmlFor={this.nameInputId} className={styles.name_input}>
            <span>Name</span>
            <input
              onChange={this.handleChange}
              id={this.nameInputId}
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>

          <label htmlFor={this.numberInputId} className={styles.number_input}>
            <span>Number</span>
            <input
              onChange={this.handleChange}
              id={this.numberInputId}
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
            <button type="submit" className={styles.add_Btn}>
              Add contact
            </button>
          </label>
        </div>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  initialState: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ContactsForm;
