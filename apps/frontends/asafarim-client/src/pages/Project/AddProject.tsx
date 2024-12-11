// src/pages/Project/AddProject.tsx

import Wrapper from "../../layout/Wrapper/Wrapper";
import AddForm from "../../components/crud/AddForm";

const AddProject: React.FC = () => {
    return (
        <Wrapper>
            <AddForm
                key={"project"}
            />
        </Wrapper>
    );
};

export default AddProject;
