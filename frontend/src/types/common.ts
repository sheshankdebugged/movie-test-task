// Login values types
export interface LoginValuesTypes {
    email: string;
    password: string | number
}

// Add New Movie
export interface AddMovieType {
    movie_title: string;
    publish_year: number | string;
}

export interface AddMovieTypeSubmit extends AddMovieType {
    movie_link : string
}