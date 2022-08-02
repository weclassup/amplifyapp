import React from "react";
import { RouteComponentProps } from "react-router";

import ChatWithStudentScreen from "@Screen/QuestionScreen/ProcessingQuestion/ChatWithStudentScreen";

const ChatWithStudentRecordScreen: React.FC<
  RouteComponentProps<{ questionId: string }>
> = (props) => {
  return <ChatWithStudentScreen {...props} />;
};

export default ChatWithStudentRecordScreen;
