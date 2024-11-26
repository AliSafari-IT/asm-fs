import React, { useState } from 'react';
import { Button, makeStyles } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@fluentui/react';
import Wrapper from '../../layout/Wrapper/Wrapper';
import dashboardServices from '../../api/dashboardServices';

const useStyles = makeStyles({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '20px',
    },
    formField: {
        width: '300px',
    },
});

const AddTagForm: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [tagName, setTagName] = useState<string>('');
    const [tagTitle, setTagTitle] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dashboardServices.addEntity('tags', { name: tagName, title: tagTitle });
            alert('Tag added successfully!');
            navigate('/dashboard');  // Navigate back to the main page after submission
        } catch (error) {
            console.error('Error adding tag:', error);
            alert('Failed to add the tag.');
        }
    };

    return (
        <Wrapper header={<h1 className="text-3xl font-bold text-center">Add New Tag</h1>}>
                <div className={classes.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tag Name"
                            className={classes.formField}
                            value={tagName}
                            onChange={(e) => setTagName((e.target as HTMLInputElement).value)}
                            required
                        />
                        <TextField
                            label="Tag Title"
                            className={classes.formField}
                            value={tagTitle}
                            onChange={(e) => setTagTitle((e.target as HTMLInputElement).value)}
                            required
                        />
                        <Button type="submit" style={{float: 'right', marginTop: '10px' }}>Add Tag</Button>
                    </form>
                </div>
        </Wrapper>
    );
};

export default AddTagForm;
