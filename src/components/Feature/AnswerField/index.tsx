import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faCloudUpload,
  faPaperPlane,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FilePreviewer,
  Flexbox,
  Fonts,
  formatChecker,
  validator,
} from "@methodstudio/class-component-module";
import classNames from "classnames";
import { RefCallBack } from "react-hook-form/dist/types";

import {
  TeacherAnswerQuestionReq,
  TeacherQuestionDetailDto,
} from "@api/teacher.api";

export interface AnswerFormValues
  extends Omit<TeacherAnswerQuestionReq, "teacherAnswerAttachmentFileIds"> {
  teacherAnswerAttachmentFiles: File[];
}

interface Props {
  submitHandler: (formValue: AnswerFormValues) => void;
  status: TeacherQuestionDetailDto["status"];
}

const AnswerField: React.FC<Props> = ({ submitHandler, status }) => {
  const [textareaFocusing, setTextareaFocusing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { control, watch, setValue, register, handleSubmit } =
    useForm<AnswerFormValues>({ mode: "all" });

  const watchFiles = watch("teacherAnswerAttachmentFiles");
  const { ref, onBlur, ...restRegister } = register("teacherAnswerContent", {
    required: validator.required,
  });

  const removeHandler = useCallback(
    (index: number) => {
      const fileAry = watchFiles.filter((_, idx) => idx !== index);
      setValue("teacherAnswerAttachmentFiles", fileAry);
    },
    [watchFiles]
  );

  if (status !== "ANSWERING") return null;

  return (
    <div
      className={classNames(
        "py-4",
        "px-6",
        "bg-bg-blue",
        "border-t",
        "border-solid",
        "border-grey4",
        "md:pt-6",
        "md:pb-10",
        "md:px-[3.75rem]",
        "lg:px-[5.75rem]"
      )}
    >
      <Fonts
        fontSize={"primaryButton"}
        className={classNames(
          "px-2",
          "py-1",
          "bg-[#00B25D]",
          "text-white",
          "rounded-xs",
          "w-fit",
          "mb-5"
        )}
      >
        答案
      </Fonts>
      <Fonts fontSize={"secondaryBody"} className={classNames("pb-3")}>
        請輸入你的答案，或上傳照片、影片、音訊等附件
      </Fonts>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Flexbox
          direction={"col"}
          justify={"between"}
          className={classNames(
            "border",
            "border-solid",
            textareaFocusing ? "border-primary" : "border-grey4",
            "rounded-sm",
            "min-h-[12rem]",
            "bg-white",
            "mb-3",
            "p-4",
            "pt-3"
          )}
        >
          <div
            onClick={() => textareaRef.current?.focus()}
            className={classNames("flex-1", "mb-2")}
          >
            <TextareaAutosize
              onFocus={() => setTextareaFocusing(true)}
              onBlur={(e) => {
                onBlur(e);
                setTextareaFocusing(false);
              }}
              className={classNames(
                "w-full",
                "resize-none",
                "focus:outline-none"
              )}
              {...restRegister}
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
            />
          </div>
          <Flexbox
            as={"ul"}
            wrap={"wrap"}
            className={classNames("-mr2", "-mb-2")}
          >
            {watchFiles?.map((file, index) => {
              return (
                <li
                  key={index}
                  className={classNames(
                    "w-24",
                    "h-24",
                    "rounded-sm",
                    "overflow-hidden",
                    "relative",
                    "mr-2",
                    "mb-2"
                  )}
                >
                  <FilePreviewer file={file} />
                  <button
                    type={"button"}
                    onClick={() => removeHandler(index)}
                    className={classNames(
                      "w-5",
                      "h-5",
                      "text-grey2",
                      "absolute",
                      "z-[2]",
                      "top-2",
                      "right-2"
                    )}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </li>
              );
            })}
          </Flexbox>
        </Flexbox>
        <Flexbox justify={"between"}>
          <Controller
            control={control}
            name={"teacherAnswerAttachmentFiles"}
            defaultValue={[]}
            render={({ field: { ref, ...field } }) => (
              <UploadButton {...field} customRef={ref} />
            )}
          />
          <Button
            buttonFonts={"secondary"}
            type={"submit"}
            defaultSize={false}
            buttonStyle={"primary"}
            className={classNames("px-3", "py-2")}
            fill
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={classNames("mr-2")}
            />
            送出答案
          </Button>
        </Flexbox>
      </form>
    </div>
  );
};

export default AnswerField;

const UploadButton: React.FC<
  Omit<
    ControllerRenderProps<AnswerFormValues, "teacherAnswerAttachmentFiles">,
    "ref"
  > & { customRef: RefCallBack }
> = ({ value, onChange, onBlur, customRef }) => {
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const file = e.target.files?.item(0);
      if (formatChecker.isNotSet(file)) return;
      if (file.size > 50 /*MB*/ * 1024 /*KB*/ * 1024 /*Byte*/) {
        alert("上傳檔案大小上限為50MB");
        // } else if (file.type === "video/quicktime") {
        //   alert(`檔案格式(${file.type})不支援。`);
      } else {
        onChange([...value, file]);
      }
      e.target.value = "";
      e.target.files = null;
    },
    [value]
  );

  const isReadOnly = useMemo(() => value.length >= 3, [value]);

  return (
    <React.Fragment>
      <Fonts
        as={"label"}
        htmlFor={"upload"}
        fontSize={"secondaryButton"}
        className={classNames(
          "px-3",
          "py-2",
          "border",
          "border-solid",
          isReadOnly ? "border-grey4" : "border-primary",
          "rounded-sm",
          isReadOnly ? "text-grey3" : "text-primary",
          "hover-hover:hover:cursor-pointer",
          "hover-hover:hover:opacity-70"
        )}
      >
        <FontAwesomeIcon icon={faCloudUpload} className={classNames("mr-2")} />
        上傳附件
      </Fonts>
      <input
        disabled={isReadOnly}
        className={classNames("hidden")}
        onChange={changeHandler}
        onBlur={onBlur}
        id={"upload"}
        ref={customRef}
        type="file"
        accept="image/*,audio/*,video/*,.m4a"
      />
    </React.Fragment>
  );
};
