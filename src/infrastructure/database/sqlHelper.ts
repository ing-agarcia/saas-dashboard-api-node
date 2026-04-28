export function convertPlaceholders(sql: string): string {

    let index = 0;

    return sql.replace(/\?/g, () => {
        index++;
        return `$${index}`;
    });

}