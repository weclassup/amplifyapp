import React, { useEffect, useState } from "react";

import {
  Flexbox,
  Fonts,
  formatChecker,
  Label,
  ScreenContainer,
  UserProfilePicture,
  useTeacherAuth,
} from "@methodstudio/class-component-module";
import { getNormalFormat } from "@methodstudio/class-component-module/lib/esm/helper/moment.helper";
import classNames from "classnames";

import ProfileSettingForm from "@Screen/AccountManager/Profile/Feature/ProfileSettingForm";
import SelfIntroductionForm from "@Screen/AccountManager/Profile/Feature/SelfIntroductionForm";
import UpdateEmailWizardForm from "@Screen/AccountManager/Profile/Feature/UpdateEmailWizardForm";
import UpdatePasswordWizardForm from "@Screen/AccountManager/Profile/Feature/UpdatePasswordWizardForm";
import UpdatePhoneWizardForm from "@Screen/AccountManager/Profile/Feature/UpdatePhoneWizardForm";
import { GenderEnum } from "@static/static.options";

const Profile = () => {
  const { getUserProfile } = useTeacherAuth.useContainer();

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <ScreenContainer heading={"個人檔案"}>
      <div className={classNames("md:px-10")}>
        <AccountSetting />
        <ProfileSetting />
        <DegreeSetting />
      </div>
    </ScreenContainer>
  );
};

export default Profile;

const Section: React.FC<{
  sectionTitle: string;
  TitleRight?: React.ReactElement;
}> = ({ children, sectionTitle, TitleRight }) => {
  return (
    <section className={classNames("w-full", "bg-white", "rounded-xl", "mb-6")}>
      <Flexbox
        className={classNames(
          "py-5 px-6 md:py-6",
          "border-b",
          "border-solid",
          "border-grey4"
        )}
      >
        <Fonts fontSize={"title"}>{sectionTitle}</Fonts>
        {TitleRight}
      </Flexbox>
      <div
        className={classNames("w-full", "md:px-6", "divide-y", "divide-grey4")}
      >
        {children}
      </div>
    </section>
  );
};

const SectionRow: React.FC<{ label: string; value?: string }> = ({
  children,
  label,
  value,
}) => {
  return (
    <Flexbox
      align={"start"}
      justify={"start"}
      className={classNames(
        "px-6 py-3 md:pl-6 md:pr-0 md:py-5",
        "flex-wrap md:flex-nowrap gap-y-1 md:gap-y-0"
      )}
    >
      <Fonts
        fontSize={"primaryButton"}
        className={classNames(
          "w-full md:w-40",
          "text-grey2",
          "leading-6",
          "flex-shrink-0"
        )}
      >
        {label}
      </Fonts>
      <Fonts
        condition={formatChecker.isSet(value)}
        fontSize={"primaryBody"}
        className={classNames("leading-6")}
      >
        {value}
      </Fonts>
      {children}
    </Flexbox>
  );
};

const SectionButton: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <Fonts
      as={"button"}
      fontSize={"primaryButton"}
      className={classNames(
        "text-primary",
        "ml-auto",
        "leading-6",
        "flex-shrink-0"
      )}
      type={"button"}
      onClick={onClick}
    >
      {children}
    </Fonts>
  );
};

const AccountSetting = () => {
  const [startUpdateEmail, setStartUpdateEmail] = useState<boolean>(false);
  const [startUpdatePassword, setStartUpdatePassword] =
    useState<boolean>(false);
  const [startUpdatePhone, setStartUpdatePhone] = useState<boolean>(false);

  const { userProfile } = useTeacherAuth.useContainer();

  return (
    <React.Fragment>
      <UpdateEmailWizardForm
        open={startUpdateEmail}
        close={() => setStartUpdateEmail(false)}
      />
      <UpdatePasswordWizardForm
        open={startUpdatePassword}
        close={() => setStartUpdatePassword(false)}
      />
      <UpdatePhoneWizardForm
        open={startUpdatePhone}
        close={() => setStartUpdatePhone(false)}
      />
      <Section sectionTitle={"帳戶設定"}>
        <SectionRow label={"電子郵件"} value={userProfile?.email}>
          <SectionButton onClick={() => setStartUpdateEmail(true)}>
            變更電子郵件
          </SectionButton>
        </SectionRow>
        <SectionRow label={"密碼"} value={"********"}>
          <SectionButton onClick={() => setStartUpdatePassword(true)}>
            變更密碼
          </SectionButton>
        </SectionRow>
        <SectionRow
          label={"手機號碼"}
          value={userProfile?.activeProfile?.phone}
        >
          <SectionButton onClick={() => setStartUpdatePhone(true)}>
            變更手機
          </SectionButton>
        </SectionRow>
      </Section>
    </React.Fragment>
  );
};

const ProfileSetting = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const { userProfile } = useTeacherAuth.useContainer();
  const activeProfile = userProfile?.activeProfile;

  return (
    <React.Fragment>
      <ProfileSettingForm openForm={editing} close={() => setEditing(false)} />
      <Section
        sectionTitle={"基本資訊"}
        TitleRight={
          <SectionButton onClick={() => setEditing(true)}>編輯</SectionButton>
        }
      >
        <SectionRow label={"個人照片"}>
          <Flexbox
            align={"center"}
            justify={"center"}
            className={classNames("w-full md:w-fit")}
          >
            <UserProfilePicture
              defaultSize={false}
              url={userProfile?.activeProfile?.profilePicture?.url}
              className={classNames("w-[6.25rem] h-[6.25rem]", "-mt-1")}
            />
          </Flexbox>
        </SectionRow>
        <SectionRow label={"姓氏"} value={activeProfile?.surName} />
        <SectionRow label={"名字"} value={activeProfile?.givenName} />
        <SectionRow label={"暱稱"} value={activeProfile?.nickName} />
        <SectionRow
          label={"性別"}
          value={activeProfile?.gender && GenderEnum[activeProfile.gender]}
        />
        <SectionRow
          label={"生日"}
          value={getNormalFormat(activeProfile?.birthday || "", {
            withoutTime: true,
          })}
        />
      </Section>
    </React.Fragment>
  );
};

const DegreeSetting = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const { userProfile } = useTeacherAuth.useContainer();
  const activeProfile = userProfile?.activeProfile;

  return (
    <React.Fragment>
      <SelfIntroductionForm
        openForm={editing}
        close={() => setEditing(false)}
      />
      <Section sectionTitle={"學歷與擅長科目"}>
        <SectionRow label={"最高學歷"} value={activeProfile?.degree?.name} />
        <SectionRow
          label={"學校"}
          value={
            activeProfile?.degreeSchool?.name || activeProfile?.customSchoolName
          }
        />
        <SectionRow
          label={"系所"}
          value={
            activeProfile?.degreeSchoolDepartment?.name ||
            activeProfile?.customSchoolDepartmentName
          }
        />
        <SectionRow label={"擅長科目"}>
          <Flexbox as={"ul"} wrap={"wrap"} className={classNames("gap-y-2")}>
            {activeProfile?.subjects?.map((subject) => (
              <Label
                key={subject.id}
                className={classNames(
                  "bg-dark-blue",
                  "bg-opacity-[0.06]",
                  "text-primary"
                )}
              >
                {subject.parent?.name}
                {subject.name}
              </Label>
            ))}
          </Flexbox>
        </SectionRow>
        <SectionRow label={"自我介紹"}>
          <Flexbox className={classNames("items-start gap-x-3", "flex-1")}>
            <Fonts
              fontSize={"primaryBody"}
              className={classNames(
                "leading-6 whitespace-pre-wrap",
                "md:mr-[3.75rem]"
              )}
            >
              {activeProfile?.selfIntroduction}
            </Fonts>
            <SectionButton onClick={() => setEditing(true)}>編輯</SectionButton>
          </Flexbox>
        </SectionRow>
      </Section>
    </React.Fragment>
  );
};
