import { ITask } from "../../../components/task/components/interface";

export interface IUser {
	id:                 string;
	name:               string;
	lastname:           string;
	email:              string;
	phone:              string;
	birthday:           Date;
	email_verified_at:  null;
	profile_photo_path: string | undefined;
	created_at:         string;
	updated_at:         string;
	deleted_at:         null;
	tasks_desc: 				Array<ITask>
	profile:            IProfile;
}

enum Role {
  Admin = "admin",
  Moderator = "moderator",
  Professor = "professor",
  Student = "student",
}

export interface IProfile {
	id:         string;
	ranking:    number;
	slug:       string;
	about:      string;
	user_id:    number;
	role:       Role[];
	user:       IUser;
	images:     null;
	created_at: string;
	updated_at: string;
	deleted_at: null;

}
