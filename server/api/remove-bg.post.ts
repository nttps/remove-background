  export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    
    const formData = await readFormData(event);

    const uri = `${config.api}upload`

    
    const data: any = await $fetch(uri, {
        method: "post",
        body: formData,
    });

    return {
        success: true,
        url: data.url,
    };
});

