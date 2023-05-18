import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/handleHooks";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "../../components/Form/Form";

const EditArticle: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const defaultValues: Values = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };
  const {
    register,
    control,
    handleSubmit,
    formsState: { errors, isValid },
  } = useForm<Values>({
    mode: "onBlur",
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<Values | any>({
    control,
    name: "tagList",
    rules: { required: "append something" },
  });
  return <Form onSubmit={} title={"Edit article"} buttonText={"Send"}></Form>;
};

export default EditArticle;
