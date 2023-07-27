// EXTERNAL
import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';


// INTERNAL
import { chooseStatus, chooseOwned, chooseUserNotes, chooseUserScore } from '../../redux/slices/rootSlice';
import { BookState } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface UpdateFormProps{
    id?: string;
    data?: BookState;
};


export const UpdateForm = (props: UpdateFormProps) =>{
    const dispatch = useDispatch();
    const store = useStore();
    const {register, handleSubmit} = useForm<BookState>({})


    const onSubmit: SubmitHandler<BookState> =async (data, event) => {
        if (event) event.preventDefault()

        if(props.id){
            console.log(props.id)
            await serverCalls.update(props.id, data)
            console.log("Book has been updated")
            window.location.reload()
            if (event) event.target.reset()
        }else{
            dispatch(chooseStatus(data.status))
            dispatch(chooseOwned(data.owned))
            dispatch(chooseUserScore(data.user_score))
            dispatch(chooseUserNotes(data.user_notes))

            console.log(store.getState())
        
            await serverCalls.create(store.getState() as BookState)
            window.location.reload()
            if (event) event.currentTarget.reset()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="status">Reading Status</label>
                    <Input {...register("status")} name="status" placeholder="Current Reading progress" />
                </div>
                <div>
                    <label htmlFor="owned">Ownership Status</label>
                    <Input {...register("owned")} name="owned" placeholder="Current Status of Ownership" />
                </div>
                <div>
                    <label htmlFor="user_score">Your Rating</label>
                    <Input {...register("user_score")} name="user_score" placeholder="Personal Rating" />
                </div>
                <div>
                    <label htmlFor="user_notes">Your Notes</label>
                    <Input {...register("user_notes")} name="user_notes" placeholder="Your Notes on This Work" />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
};