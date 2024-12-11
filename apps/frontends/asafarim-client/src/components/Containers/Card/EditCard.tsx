import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, FluentProvider, makeStyles } from '@fluentui/react-components';
import { Stack, TextField, VirtualizedComboBox } from '@fluentui/react';
import dashboardServices from '../../../api/entityServices';
import { getFluentProviderTheme } from '../../../utils/themeUtils';
import Loading from '../../Loading/Loading';
const currentTheme = getFluentProviderTheme();

const useStyles = makeStyles({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1px',
        padding: '20px',
        width: '400px',
        maxWidth: '500px',
        minWidth: '300px',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: currentTheme.colorNeutralForeground1,
        color: currentTheme.colorNeutralBackground1,
    },
    formField: {
        width: '400px',
        padding: '5px',
        alignItems: 'center',
    },
    button: {
        marginTop: '20px',
    },
    card: {
        margin: "auto",
        width: "520px",
        maxWidth: "420px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(190,0,60,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        "&:hover": {
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        },
        "&:focus": {
            outline: "none",
        },
        color: currentTheme.colorNeutralForeground1,
    }
});

const EditCard: React.FC = () => {
    const { model, id } = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState<any>(null); 
    const [typedData, setTypedData] = useState<any>();

    const validateData = (typedData: any) => {
        // Ensure the tag data contains 'name' and 'title'
        if (model === 'tags' && (!typedData.name || !typedData.title)) {
            alert('Both name and title are required.');
            return;
        }
    };

    const fetchData = async () => {
        try {
            console.log('Fetch data for EditCard', model, 'ID:', id);
            const fetched = await dashboardServices.fetchEntityById(`${model}`, `${id}`);
            console.log('Fetched in EditCard:', fetched);
            setFetchedData(fetched);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data');
        }
    };

    useEffect(() => {
        if (model)
            fetchData();
    }, [model, id]);

    useEffect(() => {
        if (fetchedData) {
            console.log('Fetched data:', fetchedData);
            if (typeof fetchedData === 'object' && fetchedData !== null) {
                setTypedData(fetchedData);
            }
        }
    }, [fetchedData]);

    useEffect(() => {
        console.log('Typed data:', typedData);
    }, [typedData]);

    const handleUpdate = async () => {
        try {

            const { blogPosts, relatedPosts, ...dataWithoutEmptyFields } = typedData;
            validateData(typedData);

            // Remove blogPosts if it is an empty array
            var updatedData = blogPosts && blogPosts.length > 0 ? { ...dataWithoutEmptyFields, blogPosts } : dataWithoutEmptyFields;

            // Remove relatedPosts if it is an empty array
            updatedData = model === 'topics' && relatedPosts && relatedPosts.length > 0 ? { ...updatedData, relatedPosts } : updatedData;

            await dashboardServices.updateEntity(model ?? '', id!, updatedData);  // Send only valid fields
            alert('Update successful');
            navigate(-1); // Go back after successful update
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update');
        }
    };

    return (
        <FluentProvider theme={currentTheme}>
            <div className={classes.formContainer}>
                <h2>Edit {model?.toUpperCase()}</h2>
                <div className={classes.card + " flex flex-col p-5 gap-1 border border-gray-300 rounded md:p-2"}>
                    {typedData ? Object.entries(typedData as { [key: string]: any })?.map(([key, value]) => (
                        <div key={key}>
                            <label className='text-sm' htmlFor={key}>{key}</label>
                            {Array.isArray(value) && value.length > 0 ?
                                <VirtualizedComboBox key={key} multiSelect options={value.map((item: any) => {
                                    console.log('item:', item);
                                    return ({ key: item.id, text: (item.id? item.name?? item.title : item) });
                                })}
                                    styles={{
                                        root: { width: '100%' },
                                       screenReaderText: { display: 'none' },
                                    }}
                                /> :
                                <TextField
                                    key={key}
                                    value={value}
                                    onChange={(e) => setTypedData({ ...typedData, [key]: (e.target as HTMLInputElement).value })}
                                    className={classes.formField}
                                    name={key}
                                    styles={{
                                        root: { width: '100%' },
                                        fieldGroup: { width: '100%', padding: 0, '&:focus': { outline: 'blue' } },
                                        field: { padding: 0 },
                                        icon: { padding: 0 },
                                    }}
                                    disabled={key === 'id'}
                                />
                            }
                        </div>
                    )) :
                        <Loading size={16} />}
                </div>
                <Stack horizontal={true} verticalFill={true} className='flex flex-auto mt-5'>
                    <Button onClick={handleUpdate}>Save Changes</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                </Stack>
            </div>
        </FluentProvider>
    );
};

export default EditCard;
