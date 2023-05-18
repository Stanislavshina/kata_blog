import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormState } from "../../types/FromArticle";
import Form from "../../components/Form/Form";
import { createArticle } from "../../api/article";
import { useAppSelector } from "../../store/handleHooks";
import cl from "./NewArticle.module.scss";

const NewArticle: React.FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.user);

  const defaultValues: FormState = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({ defaultValues, mode: "onBlur" });

  const { fields, append, remove } = useFieldArray<
    FormState["tagList"][0] | any
  >({ control, name: "tagList" });

  const handleClick = async (data: FormState) => {
    await createArticle(data, state.token);
    navigate("/");
  };

  return (
    <Form
      onSubmit={handleSubmit(handleClick)}
      title={"Create new article"}
      buttonText={"Send"}
    >
      <label>
        Title
        <input
          className={`${cl.input} ${errors.title ? cl.error : ""}`}
          type="text"
          placeholder="Title"
          {...register("title", { required: "Укажите заголовок" })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </label>
      <label>
        Short description
        <input
          className={`${cl.input} ${errors.description ? cl.error : ""}`}
          type="text"
          placeholder="Short description"
          {...register("description", { required: "Укажите description" })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <label>
        Text
        <textarea
          placeholder="Post body"
          className={`${cl.textArea} ${errors.body ? cl.error : ""}`}
          {...register("body", { required: "Укажите текст" })}
        />
        {errors.body && <span>{errors.body.message}</span>}
      </label>
      <label>
        Tags
        {fields && fields.length > 0 ? (
          fields.map((field, ind) => (
            <div key={field.id} className={cl["tags"]}>
              <input
                className={`${cl.input} ${errors.tagList ? cl.error : ""}`}
                type="text"
                autoFocus
                placeholder="Tag"
                {...register(`tagList.${ind}.name` as const, {
                  required: "Укажите тег",
                })}
              />
              <button onClick={() => remove(ind)} className={cl["delete"]}>
                Delete
              </button>
              {ind === fields.length - 1 && (
                <button
                  onClick={() => append({ name: "" })}
                  className={cl["add"]}
                >
                  Add tag
                </button>
              )}
            </div>
          ))
        ) : (
          <button onClick={() => append({ name: "" })} className={cl["add"]}>
            Add tag
          </button>
        )}
      </label>
    </Form>
  );
};

export default NewArticle;
