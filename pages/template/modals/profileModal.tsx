import Modal from '../../../components/modal';

const ProfileModal = () => {
  return (
    <Modal header={{text:'modal test'}}
    body={
      <div className="container">
        <h1>Welcome to the Next.js Playground!</h1>
        <p>This is a simple playground to test and showcase various Next.js features and components.</p>
      </div>
    }
    />
  );
};
export default ProfileModal;
