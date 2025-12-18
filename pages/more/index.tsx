import Icons from '@/components/icon';
import Content from '../../components/content/content'
import Button from '@/components/button';
import { useModal } from '@/components/modal/modelContext';

const More = () => {
  const {faceSmile} = Icons;
  const { openModal } = useModal();

  return (
    <Content header={{text:'more', icon:faceSmile}}
    body={
      <div className="d-flex just-cont-center container">
        <div>
          <Button label='open modal' onClick={() => openModal("moreModal")}/>
        </div>
      </div>
    }
    />
  );
};
export default More;
