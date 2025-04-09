import { usePage } from '@inertiajs/inertia-react';

export default function useRole() {
    const { props } = usePage();
    return props.auth.user?.role;
}
