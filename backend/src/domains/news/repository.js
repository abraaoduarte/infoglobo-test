import News from 'schemas/news';
import HttpResponseError from 'exceptions/HttpResponseError';

export const all = () => News.find();
export const show = id => News.findById(id);

export const create = (data) => {
  const news = new News({
    title: data.title,
    content: data.content,
    publication_date: data.publication_date,
  });

  return news.save()
    .then(news => news)
    .catch((error) => {
      throw new HttpResponseError({
        status: 400,
        message: `Ocorreu um erro ao cadastrar notícia: ${error}`,
      });
    });
};

export const update = (id, data) => {
  const news = {
    title: data.title,
    content: data.content,
    publication_date: data.publication_date,
  };

  return News.findOneAndUpdate(
    { _id: id },
    news,
    { runValidators: true, new: true },
  )
    .then(news => news);
};

export const destroy = id => News.findOneAndRemove({ _id: id }).then(news => news);
