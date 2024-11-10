import CustomDialog, { CustomeDialogModel } from "./CustomDialog";

const BiospeciesSelection = ({ isOpen, onConfirm, onCancel }: CustomeDialogModel) => {
  const content = getContent();
  return (
    <CustomDialog
      isOpen={isOpen}
      content={content}
      confirmButtonLabel="OK"
      onConfirm={onConfirm}
    />
  );
}

const getContent = (): JSX.Element => {
  return (
    <>
      <h6>アミノ酸配列が選択されました。<br/>塩基配列は、自動的に作成されます。</h6>
    </>
  );
}
export default BiospeciesSelection;