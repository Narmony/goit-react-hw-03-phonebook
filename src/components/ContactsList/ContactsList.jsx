import styles from './contactsList.module.css';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, onDelete }) => {
  return (
    <div className={styles.contacts_block}>
      <span className={styles.contacts_title}>Contacts:</span>
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li className={styles.contact_item} key={id}>
            <span className={styles.name}>{name}</span>
            <span className={styles.number}>{number}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactsList;
