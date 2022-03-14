import React from "react";
import { useForm } from "react-hook-form"
// import { useTwilio } from 'lib/hooks'
import { Album } from '@styled-icons/boxicons-regular'


export default function SendSmsForm({ onCancel, updating, onSubmit, error }) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="flex fd-col mb-s">
        <input placeholder="Message" {...register("message", {
          required: true,
        })} />
        {errors.message && <span className="mt-s error">Message is required</span>}
        {error && <span className="mt-s error">Failed to send. Try again</span>}

      </div>
      <button className="active std-div mt-s">
        {updating ? (
          <div className="flex-c-c">
            <div>Sending</div>
            <Album size='18' className="c-brand ml-s rotate" />
          </div>
        ) : (
          <div>Send</div>
        )}
      </button>
      {(onCancel && !updating) && (
        <button type='button' onClick={onCancel} className="border std-div mt-s ml-s">
          Cancel
        </button>
      )}

    </form>
  );
}