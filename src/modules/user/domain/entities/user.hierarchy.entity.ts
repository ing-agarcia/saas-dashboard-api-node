export class UserHierarchy {
    private constructor(
        public parentUserId: number,
        public childUserId: number,
        public level: number
    ) { }

}
