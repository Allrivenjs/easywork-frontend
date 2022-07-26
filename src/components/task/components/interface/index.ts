import { IUser } from "../../../../context/AuthContext/interfaces";

export interface INewComment {
	body: string;
	own_id: string;
	task_id: string;
}

export interface IComment {
    id:         number;
    own_id:     number;
		owner: 			IUser;
    parent_id:  null;
    body:       string;
    created_at: Date;
    updated_at: Date;
    replies:    any[];
}

export interface ITask {
    id:              string;
    name:            string;
    slug:            string;
    description:     string;
    difficulty:      string;
    status_id:       number;
    own_id:          string;
    finished_at:     null;
    created_at:      string;
    updated_at:      string;
    deleted_at:      null;
    comments_lasted: IComment[];
    topics:          ITopic[];
    owner:           IOwner;
    files:           IFile[];
    status_last:     ITopic;
}

export interface IOwner {
    id:                 number;
    name:               string;
    lastname:           string;
    email:              string;
    phone:              string;
    birthday:           Date;
    email_verified_at:  Date;
    profile_photo_path: string;
		profile_slug: 	 string;
    created_at:         string;
    updated_at:         string;
    deleted_at:         null;
    profile:            Profile;
}

export interface Profile {
    id:         number;
    ranking:    number;
    slug:       string;
    about:      string;
    user_id:    number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
}

export interface IFile {
    url:          string;
    mime:         string;
    originalName: string;
}

export interface ITopic {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
}
