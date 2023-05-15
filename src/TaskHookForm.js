import React from 'react';
import { useForm } from 'react-hook-form';

function TaskHookForm({ kisiler, submitFn }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    submitFn({
      ...data,
      id: Date.now(),
      status: "yapılacak"
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", { required: "Task başlığı yazmalısınız", minLength: { value: 3, message: "Task başlığı en az 3 karakter olmalı" } })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", { required: "Task açıklaması yazmalısınız", minLength: { value: 10, message: "Task açıklaması en az 10 karakter olmalı" } })}
        ></textarea>
        {errors.description && <p className="input-error">{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">Kişiler</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: {
                    atLeastOnePerson: (value) =>
                      Array.isArray(value) && value.length > 0,
                    maxThreePeople: (value) =>
                      Array.isArray(value) && value.length <= 3,
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && errors.people.type === "atLeastOnePerson" && (
          <p className="input-error">En az bir kişi seçin</p>
        )}
        {errors.people && errors.people.type === "maxThreePeople" && (
          <p className="input-error">En fazla 3 kişi seçebilirsiniz</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">Kaydet</button>
      </div>
    </form>
  );
}

export default TaskHookForm;