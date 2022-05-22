import { useEffect } from 'react';
import { IItem } from './index';

function List(props: { items: IItem[] }) {
    return (
        <ol>
            {props.items.map((item) => (
                <li key={item.id} id={item.id.toString()}>
                    {item.name}
                </li>
            ))}
        </ol>
    );
}

function sortList(sorting: 'ASC' | 'DESC') {
    let ol = document.querySelector('ol');
    if (ol) {
        let new_ol = [];
        if (sorting === 'ASC')
            new_ol = Array.from(ol.children).sort((a, b) => {
                return a.id.localeCompare(b.id);
            });
        else
            new_ol = Array.from(ol.children).sort((a, b) => {
                return b.id.localeCompare(a.id);
            });
        ol.innerHTML = '';
        new_ol.forEach((li) => {
            if (ol) ol.appendChild(li);
        });
    }
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    useEffect(() => {
        sortList(props.sorting);
    }, [props.sorting]);
    return (
        <div>
            <List items={props.initialData} />
        </div>
    );
}

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === 'LI') {
        const input = document.createElement('input');
        input.id = target.id;
        input.dataset.text = target.textContent || '';
        input.value = target.textContent || '';
        let ol = document.querySelector('ol');
        if (ol) ol.insertBefore(input, target);
        target.remove();
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const input = document.querySelector('input');
    if ((key === 'Enter' || key === 'Escape') && input) {
        const li = document.createElement('li');
        li.id = input.id;
        if (key === 'Enter') li.textContent = input.value;
        else li.textContent = input.dataset.text || '';
        let ol = document.querySelector('ol');
        if (ol) ol.insertBefore(li, input);
        input.remove();
    }
});
