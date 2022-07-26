export interface IChatUser {
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
		pivot:              IChatUserPivot;
}

export interface IChatMessage {
    id:         string;
    message:    string;
    read_at:    null;
    user_id:    string;
    room_id:    string;
    created_at: Date;
    updated_at: Date;
    user:       IChatUser;
}

export interface ISendMessage {
	room_id: string;
	message: string;
}

export interface IChatRoom {
    id:           string;
    name:         string;
    type:         number;
    created_at:   Date;
    updated_at:   Date;
    pivot:        IChatUserPivot;
    users:        IChatUser[];
    last_message: IChatLastMessage[];
}

export interface INewMessage {
	message: string;
	room_id: string;
	user_id: string;
}

export interface IChatLastMessage {
    id:         number;
    message:    string;
    read_at:    null;
    user_id:    number;
    room_id:    number;
    created_at: Date;
    updated_at: Date;
}

export interface IChatUserPivot {
    user_id: number;
    room_id: number;
}
