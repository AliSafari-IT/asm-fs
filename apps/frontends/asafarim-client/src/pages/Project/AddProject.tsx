// src/pages/Project/AddProject.tsx

import { useState } from "react";

import Wrapper from "../../layout/Wrapper/Wrapper";
import AddForm from "../../components/crud/AddForm";
import { useNavigate } from "react-router-dom";

const AddProject: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <AddForm
            key={"project"}
            />
        </Wrapper>
    );
};

export default AddProject;
