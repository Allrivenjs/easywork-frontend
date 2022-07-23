export interface IUser {
	id:                 number;
	name:               string;
	lastname:           string;
	email:              string;
	phone:              string;
	birthday:           Date;
	email_verified_at:  null;
	profile_photo_path: null;
	created_at:         string;
	updated_at:         string;
	deleted_at:         null;
	// profile:            IProfile;
}

enum Role {
  Admin = "admin",
  Moderator = "moderator",
  Professor = "professor",
  Student = "student",
}

export interface IProfile {
	id:         number;
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